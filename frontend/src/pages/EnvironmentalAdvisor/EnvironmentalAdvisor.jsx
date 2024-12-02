import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa6";
import { useGptActions } from "../../hooks/useGptActions";
import { useSelector, useDispatch } from "react-redux";
import { resetResponse } from "../../store/gpt/slice";
import { marked } from "marked";
import DOMPurify from "dompurify"; 
import "./Module.scss";

export const EnvironmentalAdvisor = () => {
  const [message, setMessage] = useState("");
  const [dynamicResponse, setDynamicResponse] = useState("");
  const { environmentalAdvisor } = useGptActions();
  const { responseGpt, status } = useSelector((state) => state.gpt);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetResponse());
    return () => {
      setDynamicResponse("");
    };
  }, [dispatch]);

  useEffect(() => {
    let isMounted = true;
    let interval;

    if (responseGpt && typeof responseGpt === "string") {
      let index = 0;
      setDynamicResponse("");

      interval = setInterval(() => {
        if (index < responseGpt.length && isMounted) {
          setDynamicResponse((prev) => prev + responseGpt.charAt(index));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 25);
    }

    return () => {
      isMounted = false;
      clearInterval(interval);
      setDynamicResponse("");
    };
  }, [responseGpt]);

  const handleSend = async () => {
    if (message.trim()) {
      await environmentalAdvisor(message);
      setMessage("");
    }
  };

  // Convertir Markdown a HTML y sanitizarlo
  const renderedResponse = DOMPurify.sanitize(marked(dynamicResponse));

  return (
    <div className="advisor-container">
      <h1 className="title">¿How can I help you?</h1>
      <div className="input-container">
        <textarea
          className="advisor-textarea"
          placeholder="Envía un mensaje"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button className="mic-button" onClick={handleSend}>
          <span>
            <FaArrowUp />
          </span>
        </button>
      </div>
      <div className="response-container">
        {status === "loading" && <p className="loading">🤖 Writing...</p>}
        {status === "succeeded" && dynamicResponse && (
          <div
            className="response"
            dangerouslySetInnerHTML={{ __html: renderedResponse }}
          ></div>
        )}
        {status === "failed" && <p className="error">Error: {responseGpt}</p>}
      </div>
    </div>
  );
};
