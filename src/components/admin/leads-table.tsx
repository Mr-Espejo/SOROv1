'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { Lead } from '@/lib/types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface LeadsTableProps {
  leads: Lead[] | null;
}

export function LeadsTable({ leads }: LeadsTableProps) {
  if (!leads || leads.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center rounded-md border-2 border-dashed bg-muted/50">
        <p className="text-muted-foreground">No hay prospectos para mostrar.</p>
      </div>
    );
  }

  const formatDate = (timestamp: any) => {
    if (!timestamp || !timestamp.seconds) {
      return 'Fecha no disponible';
    }
    const date = new Date(timestamp.seconds * 1000);
    return format(date, "d 'de' MMMM, yyyy 'a las' HH:mm", { locale: es });
  };

  return (
    <div className="mt-4 rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Nombre</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Clínica</TableHead>
            <TableHead>Origen</TableHead>
            <TableHead className="text-right">Fecha de Creación</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell className="font-medium">{lead.name || '-'}</TableCell>
              <TableCell>{lead.email}</TableCell>
              <TableCell>{lead.phone || '-'}</TableCell>
              <TableCell>{lead.clinicName || '-'}</TableCell>
              <TableCell>
                <Badge variant="secondary">{lead.source}</Badge>
              </TableCell>
              <TableCell className="text-right text-xs text-muted-foreground">
                {formatDate(lead.createdAt)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
