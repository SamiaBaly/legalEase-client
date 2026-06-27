import { getUserSession } from "../core/session";
import { serverFetch } from "../core/sever";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getHiresbById = async (id) => { 
  console.log(id,'from hire action');
  return serverFetch(`/api/hires/${id}`)
  
}
export const getHires = async (data) => { 
  return serverFetch(`/api/hires`, data)
}


export const getHiresByUser = async (userId) => { 
  console.log("userId", userId);
  return serverFetch(`/api/hires?userId=${userId}`)
}

export const getHiresByClient = async (clientId) => { 
  return serverFetch(`/api/hires?clientId=${clientId}`)
}
export const getHiresByClientEmail = async (clientEmail) => { 
  return serverFetch(`/api/hires?clientEmail=${clientEmail}`)
}

export const getHiresByLawyer = async (lawyerId) => { 
  return serverFetch(`/api/hires?lawyerId=${lawyerId}`)
}


export const getLoggedInHire = async () => {
  const user = await getUserSession();
  if (!user?.id) return [];

  return getHiresByClient(user.id);
};

export const getLoggedInHireLawyer = async () => {
  const user = await getUserSession();
  if (!user?.id) return [];

  return getHiresByLawyer(user.id);
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