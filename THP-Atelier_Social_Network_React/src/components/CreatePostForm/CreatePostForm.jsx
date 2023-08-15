import React, { useState } from "react";
import { useAtomValue } from "jotai";
import { tokenAtom, uidAtom } from "../../atoms/atoms";

export const CreatePostForm = ({ loadPost }) => {
  const token = useAtomValue(tokenAtom);
  const uid = useAtomValue(uidAtom);

  const [formData, setFormData] = useState({
    texte: "",
    users_permissions_user: uid,
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setMessage(''); // Reset the message when user changes the input
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.texte.trim() === "") {
      setMessage('Le texte du post ne peut pas être vide.');
      return;
    }
    
    setIsLoading(true);

    fetch("http://localhost:1337/api/posts", {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: formData }),
    })
      .then((response) => response.json())
      .then(() => {
        loadPost();
        setFormData({ texte: "", users_permissions_user: uid });
        setMessage('Votre post a bien été créé.');
      })
      .catch((error) => {
        console.error("Error:", error);
        setMessage('Une erreur est survenue lors de la création du post.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <h2>Créer un post</h2>
      <form action="" onSubmit={handleSubmit}>
        <div className="mb-3">
          <textarea
            className="form-control"
            name="texte"
            placeholder="Votre Tweet"
            value={formData.texte}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          {isLoading ? (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          ) : (
            "Publier"
          )}
        </button>
      </form>
      {message && (
        <div className="alert alert-info mt-3" role="alert">
          {message}
        </div>
      )}
    </>
  );
};
