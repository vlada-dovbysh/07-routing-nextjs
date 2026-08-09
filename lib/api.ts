import axios from "axios";
import type { Note } from "@/types/note";

const API_KEY = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

axios.defaults.baseURL = "https://next-v1-notes-api.goit.study";
axios.defaults.headers.common["Authorization"] = `Bearer ${API_KEY}`;
axios.defaults.headers.common["Accept"] = "application/json";

export interface FetchNotesHTTPResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  search?: string;
  page?: number;
  perPage?: number;
}

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: string;
}

export async function fetchNotes({
  search,
  page = 1,
  perPage = 12,
}: FetchNotesParams) {
  const response = await axios.get<FetchNotesHTTPResponse>("/notes", {
    params: {
      page,
      perPage,
      ...(search ? { search } : {}),
    },
  });

  return response.data;
}

export async function fetchNoteById(id: string) {
  const response = await axios.get<Note>(`/notes/${id}`);
  return response.data;
}

export async function createNote({
  title,
  content = "",
  tag,
}: CreateNoteParams) {
  const response = await axios.post<Note>("/notes", {
    title,
    content,
    tag,
  });

  return response.data;
}

export async function deleteNote(noteId: string) {
  const response = await axios.delete<Note>(`/notes/${noteId}`);
  return response.data;
}