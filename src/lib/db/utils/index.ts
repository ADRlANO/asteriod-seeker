import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { get, omit } from "lodash-es";
import { getUser, Identifiable } from "@xata.io/client";
import { getSession, useSession } from "vinxi/http";
import { seeker } from "..";
import { UserRequest } from "../mutations";

export function getRecordId(record: Identifiable): string {
  return get(record, "id", get(record, "xata_id", "")); // Depending of xata's version xata_id or id is used to identify a record
}

export type UserSession = {
  user_id?: string;
};

export function _getSession() {
  return useSession<UserSession>({
    password: process.env.JWT_SECRET,
  });
}

export async function getUserByEmail(email: string) {
  return await seeker.db.User.filter({ email }).getFirst();
}

export const createUser = async (data: UserRequest) => {
  "use server";
  const new_user = await seeker.db.User.create(data);

  const token = await signUserToken(getRecordId(new_user));

  return { ...new_user, token };
};

export async function loginUser(credentials: UserRequest) {
  "use server";

  //TODO Handle User === null
  const user = await getUserByEmail(credentials.email);

  if (!user) {
    return [Error("USER_NOT_FOUND"), null];
  }

  //TODO Handle match === false
  const match = await bcrypt.compare(
    credentials.password,
    user?.password ?? ""
  );

  if (!match) {
    return [Error("INCORRECT_PASSWORD"), null];
  }

  const token = await signUserToken(getRecordId(user));

  return [null, { ...user, token }];
}

export async function signUserToken(user_id: string) {
  "use server";

  return jwt.sign({ user_id }, process.env.JWT_SECRET, {
    expiresIn: "5h",
  });
}

//TODO types
export async function addAsteroidToUserFavourites(
  user: any,
  asteroid_id: string
) {
  "use server";
  const favourites = [...(user.favourites || []), asteroid_id];
  const user_to_update = omit(user, "token");
  const updated_user = await seeker.db.User.update(getRecordId(user), {
    ...user_to_update,
    favourites,
  });

  return updated_user;
}

//TODO types
export async function removeAsteroidToUserFavourites(
  user: any,
  asteroid_id: string
) {
  "use server";
  const favourites = new Set(user.favourites ?? []);
  favourites.delete(asteroid_id);

  const user_to_update = omit(user, "token");

  console.log("UPDATE User REQUEST :>> ", user_to_update);
  const updated_user = await seeker.db.User.update(getRecordId(user), {
    ...user_to_update,
    favourites: Array.from(favourites),
  });

  console.log("UPDATE User SUCCESS :>> ", updated_user);

  return updated_user;
}

//Based on https://github.com/arthurfiorette/proposal-safe-assignment-operator
export async function handleAsync(async_fn: any) {
  let result = null;
  let error = null;
  try {
    result = await async_fn();
    //TODO types
  } catch (err: any) {
    error = err;
    console.log("ERROR :>> ", err.message);
  }

  return [error, result];
}
