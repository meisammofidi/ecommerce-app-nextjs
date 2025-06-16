export default async function FetchTest() {
  const result = await fetch("http://localhost:3000/api/hello", {
    method: "GET",
  });
  const data = await result.json();

  return <h1>{data.message}</h1>;
}
