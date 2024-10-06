import { getAuth } from "@clerk/nextjs/server";
import { type GetServerSidePropsContext } from "next";

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getAuth(ctx.req);
};
