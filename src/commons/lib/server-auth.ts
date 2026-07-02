import { NextRequest } from "next/server";

const AUTH_GRAPHQL_URL =
  process.env.AUTH_GRAPHQL_URL ||
  "https://main-practice.codebootcamp.co.kr/graphql";

interface AuthenticatedUser {
  _id: string;
  name: string;
}

interface AuthGraphQLResponse {
  data?: {
    fetchUserLoggedIn?: AuthenticatedUser;
  };
  errors?: Array<{ message?: string }>;
}

/**
 * 외부 인증 서비스의 access token을 검증하고 로그인 사용자를 반환합니다.
 */
export async function authenticateRequest(
  request: NextRequest
): Promise<AuthenticatedUser | null> {
  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return null;
  }

  const accessToken = authorization.slice("Bearer ".length).trim();
  if (!accessToken) {
    return null;
  }

  const response = await fetch(AUTH_GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      query: `
        query fetchUserLoggedIn {
          fetchUserLoggedIn {
            _id
            name
          }
        }
      `,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("인증 서비스에 연결할 수 없습니다.");
  }

  const result = (await response.json()) as AuthGraphQLResponse;
  const user = result.data?.fetchUserLoggedIn;

  if (result.errors?.length || !user?._id || !user.name) {
    return null;
  }

  return user;
}
