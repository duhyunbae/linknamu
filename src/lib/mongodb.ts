import { MongoClient } from "mongodb";

const DB_NAME = "linknamu";

// 개발 모드에서는 코드가 바뀔 때마다 모듈이 다시 실행되므로,
// 연결을 전역에 보관해 매번 새 연결이 쌓이지 않게 합니다.
const globalForMongo = globalThis as unknown as {
  _mongoClientPromise?: Promise<MongoClient>;
};

function getClientPromise() {
  if (!globalForMongo._mongoClientPromise) {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI 환경 변수가 없습니다. .env.local을 확인하세요.");
    }
    const promise = new MongoClient(uri).connect();
    // 연결에 실패하면 다음 요청 때 다시 시도하도록 보관한 값을 지움
    promise.catch(() => {
      globalForMongo._mongoClientPromise = undefined;
    });
    globalForMongo._mongoClientPromise = promise;
  }
  return globalForMongo._mongoClientPromise;
}

export async function getDb() {
  const client = await getClientPromise();
  return client.db(DB_NAME);
}
