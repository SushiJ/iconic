import { api } from "~/utils/api";

export default function Community() {
  const icon = api.icon.getIcons.useQuery();
  return <pre>{JSON.stringify(icon, null, 2)}</pre>;
}
