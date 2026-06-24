import { serverMutation } from "../core/sever";

// export const submitComment = async (commentData) => { 
//   return serverMutation('/api/comments', commentData);
// };

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
console.log(baseUrl);

export const submitComment = async (commentData) => {
 return serverMutation('/api/comments', commentData);
};


export const deleteComment = async (id) => {
  try {
    const res = await fetch(`${baseUrl}/api/comments/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      
      throw new Error(data.message || "Failed to delete from server");
    }

    return { success: true, ...data };
  } catch (error) {
    console.error("Delete Error:", error);
    throw error; 
  }
};