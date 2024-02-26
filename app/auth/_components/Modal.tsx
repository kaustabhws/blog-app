"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useRouter } from 'next/navigation';

interface ModalProps {
  title: string;
  description?: string;
  isOpen: boolean;
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  description,
  isOpen,
  children,
}) => {

  const router = useRouter();

  return (
    <Dialog open={isOpen} onOpenChange={() => router.push('/')}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-2xl text-center'>{title}</DialogTitle>
          <DialogDescription className='text-center'>{description}</DialogDescription>
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};
