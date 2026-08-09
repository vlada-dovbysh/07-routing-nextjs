"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import css from "./NotePreview.module.css";

type NoteDetailsClientProps = {
  id: string;
};

export default function NoteDetailsClient({
  id,
}: NoteDetailsClientProps) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const handleClose = useCallback(() => {
    router.back();
  }, [router]);

  if (isLoading) return <p>Loading, please wait...</p>;

  if (isError || !note) return <p>Something went wrong.</p>;

  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
        <div className={css.item}>
          <button onClick={handleClose}>Go Back</button>

          <h1 className={css.header}>{note.title}</h1>

          <p className={css.content}>{note.content}</p>
        </div>
      </div>
    </Modal>
  );
}