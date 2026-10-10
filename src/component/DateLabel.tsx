import { connection } from "next/server";

export default async function DateLabel() {
  await connection();
  const date = new Intl.DateTimeFormat("bn-BD", { dateStyle: "full" }).format(new Date());
  return <>{date}</>;
}
