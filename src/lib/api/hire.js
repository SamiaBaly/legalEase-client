import { getUserSession } from "../core/session";
import { serverFetch } from "../core/sever";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getHiresbById = async (id) => { 
  console.log(id,'from hire action');
  return serverFetch(`/api/hires/${id}`)
  
}
export const getHires = async () => { 
  return serverFetch(`/api/hires`)
}


export const getHiresByClient = async (clientId) => { 
  return serverFetch(`/api/hires?clientId=${clientId}`)
}


export const getLoggedInHire = async () => {
  const user = await getUserSession();
  if (!user?.id) return [];

  return getHiresByClient(user.id);
};


// mark as paid
export const markHireAsPaid = async (hireId) => { 
  try {
    const res = await fetch(`${baseUrl}/api/hires/${hireId}/paid`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to mark hire as paid");
    }

    return await res.json();
  } catch (error) {
    console.error("markHireAsPaid error:", error);
    throw error;
  }
};
// mark as accept
export const markHireAsAccept = async (hireId) => { 
  try {
    const res = await fetch(`${baseUrl}/api/hires/${hireId}/accept`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to mark hire as accept");
    }

    return await res.json();
  } catch (error) {
    console.error("markHireAsPaid error:", error);
    throw error;
  }
};