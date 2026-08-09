import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

export const revalidate = 5;

interface Props {
  params: Promise<{
    slug: string[];
  }>;
}

export default async function Notes({ params }: Props) {
  const { slug } = await params;

  const tag = slug[0];

  const selectedTag = tag === "all" ? undefined : tag;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", tag, "", 1],
    queryFn: () =>
      fetchNotes({
        page: 1,
        search: "",
        tag: selectedTag,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}