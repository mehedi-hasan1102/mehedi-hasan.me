import { getAllSnippets } from "@/lib/snippets";
import SnippetsClient from "@/app/snippets/SnippetsClient";

export default function SnippetsPage() {
  const snippets = getAllSnippets();

  return <SnippetsClient snippets={snippets} />;
}
