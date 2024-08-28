import { delay, getProperties } from "@/lib/services";

async function Data() {
  await delay();
  const properties = await getProperties();

  return <div>data loadied {properties && properties[0].images[0].url}</div>;
}

export default Data;
