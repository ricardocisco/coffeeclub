"use server";

import { signOut } from "../../../../auth";

export default async function logout() {
  try {
    await signOut();
    window.location.reload();
  } catch (e) {
    throw e;
  }
}
