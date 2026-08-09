"use client";

import { useState } from "react";
import css from "./page.module.css";
import NoteList from "@/components/NoteList/NoteList";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { fetchNotes } from "@/lib/api";
import NoteModal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import SearchBox from "@/components/SearchBox/SearchBox";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import Pagination from "@/components/Pagination/Pagination";

export default function Notes() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 400);

  const [isModal, setIsModal] = useState(false);

  const handleCreateNote = () => {
    setIsModal(true);
  };

  const closeModal = () => {
    setIsModal(false);
  };

  const { data, isError, isLoading, isFetching, isSuccess } = useQuery({
    queryKey: ["notes", debouncedQuery, page],
    queryFn: () =>
      fetchNotes({
        page,
        search: debouncedQuery,
      }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          value={query}
          onChange={(value: string) => {
            setQuery(value);
            setPage(1);
          }}
        />

        {isSuccess && totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            currentPage={page}
            onPageChange={(selectedPage: number) =>
              setPage(selectedPage)
            }
          />
        )}

        <button onClick={handleCreateNote} className={css.button}>
          Create note +
        </button>
      </header>

      {isModal && (
        <NoteModal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </NoteModal>
      )}

      {(isLoading || isFetching) && <Loader />}

      {isError && <ErrorMessage />}

      {data?.notes.length === 0 && (
        <p>No notes found.</p>
      )}

      {data && data.notes.length > 0 && (
        <NoteList notes={data.notes} />
      )}
    </div>
  );
}