import { api } from "~/utils/api";

function Main() {
  return (
    <div className="grid grid-cols-2">
      <div>
        <p>Something Something AI here</p>
      </div>
      <div>
        <p>Something Something Photo here</p>
      </div>
    </div>
  );
}

export default function Index() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Main />
      <p>{hello.data?.greeting}</p>
    </>
  );
}
