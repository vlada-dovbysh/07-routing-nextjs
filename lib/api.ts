import axios from "axios";
import type { Note } from "@/types/note";

const MY_KEY = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.headers.common["Authorization"] = `Bearer ${MY_KEY}`;
axios.defaults.headers.common["Accept"] = "application/json";

export interface FetchNotesHTTPResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: string;
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
  tag,
}: FetchNotesParams): Promise<FetchNotesHTTPResponse> {
  const response = await axios.get<FetchNotesHTTPResponse>("/notes", {
    params: {
      page,
      perPage,
      ...(search ? { search } : {}),
      ...(tag && tag !== "all" ? { tag } : {}),
    },
  });

  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await axios.get<Note>(`/notes/${id}`);

  return response.data;
}

export async function createNote({
  title,
  content = "",
  tag,
}: CreateNoteParams): Promise<Note> {
  const response = await axios.post<Note>("/notes", {
    title,
    content,
    tag,
  });

  return response.data;
}

export async function deleteNote(noteId: string): Promise<Note> {
  const response = await axios.delete<Note>(`/notes/${noteId}`);

  return response.data;
}