import { FieldValue } from 'firebase-admin/firestore';
import { NextResponse } from 'next/server';

import { getAdminFirestore } from '@/lib/firebase/admin';

export const runtime = 'nodejs';

type VapiLeadArguments = {
  practice_name?: string;
  contact_name?: string;
  email?: string;
  phone?: string;
  timezone?: string;
  preferred_demo_times?: string[];
  notes?: string;
  request_scheduling?: boolean;
};

type VapiToolCall = {
  id?: string;
  type?: string;
  function?: {
    name?: string;
    arguments?: VapiLeadArguments;
  };
};

type VapiToolCallRequest = {
  message?: {
    type?: string;
    toolCallList?: VapiToolCall[];
    call?: {
      id?: string;
    };
  };
};

function unauthorized(toolCallId?: string) {
  return NextResponse.json(
    {
      results: [
        {
          toolCallId: toolCallId ?? 'unauthorized',
          result: {
            ok: false,
            error: 'Unauthorized',
          },
        },
      ],
    },
    { status: 401 }
  );
}

function badRequest(message: string, toolCallId?: string) {
  return NextResponse.json(
    {
      results: [
        {
          toolCallId: toolCallId ?? 'invalid-request',
          result: {
            ok: false,
            error: message,
          },
        },
      ],
    },
    { status: 400 }
  );
}

function normalizeLead(args: VapiLeadArguments, callId?: string) {
  return {
    name: args.contact_name?.trim() || undefined,
    email: args.email?.trim() || '',
    phone: args.phone?.trim() || undefined,
    clinicName: args.practice_name?.trim() || undefined,
    source: 'Vapi Voice Assistant',
    timezone: args.timezone?.trim() || undefined,
    preferredDemoTimes: Array.isArray(args.preferred_demo_times)
      ? args.preferred_demo_times.filter(Boolean)
      : [],
    notes: args.notes?.trim() || undefined,
    requestScheduling: Boolean(args.request_scheduling),
    vapiCallId: callId ?? undefined,
    createdAt: FieldValue.serverTimestamp(),
  };
}

export async function POST(request: Request) {
  const body = (await request.json()) as VapiToolCallRequest;
  const toolCall = body.message?.toolCallList?.[0];
  const toolCallId = toolCall?.id;

  const expectedToken = process.env.VAPI_WEBHOOK_BEARER_TOKEN;
  if (expectedToken) {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${expectedToken}`) {
      return unauthorized(toolCallId);
    }
  }

  if (!toolCallId) {
    return badRequest('Missing tool call id.');
  }

  if (body.message?.type !== 'tool-calls') {
    return badRequest('Unsupported message type.', toolCallId);
  }

  if (toolCall?.type !== 'function' || toolCall.function?.name !== 'submit_lead') {
    return badRequest('Unsupported tool call.', toolCallId);
  }

  const args = toolCall.function.arguments ?? {};
  if (!args.email?.trim()) {
    return badRequest('Email is required.', toolCallId);
  }

  const firestore = getAdminFirestore();
  const leadPayload = normalizeLead(args, body.message?.call?.id);

  await firestore.collection('leads').add(leadPayload);

  return NextResponse.json({
    results: [
      {
        toolCallId,
        result: {
          ok: true,
          leadSource: leadPayload.source,
        },
      },
    ],
  });
}
