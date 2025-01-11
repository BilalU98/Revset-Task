"use client";

import React from "react";
import { Container } from "@mui/material";
import DynamicForm from "../components/DynamicForm";

export default function Home() {
  // change the data here
  const dynamicData = {
    data: [
      {
        id: 1,
        name: "Full Name",
        fieldType: "TEXT",
        minLength: 1,
        maxLength: 100,
        defaultValue: "",
        required: true,
      },
      {
        id: 2,
        name: "password",
        fieldType: "PASSWORD",
        minLength: 1,
        maxLength: 50,
        defaultValue: "",
        required: true,
      },
      {
        id: 3,
        name: "Email",
        fieldType: "EMAIL",
        minLength: 1,
        maxLength: 50,
        defaultValue: "",
        required: true,
      },
      {
        id: 6,
        name: "Gender",
        fieldType: "LIST",
        defaultValue: "",
        required: true,
        listOfValues: ["Male", "Female"],
      },
      {
        id: 7,
        name: "Love React?",
        fieldType: "RADIO",
        defaultValue: "",
        required: true,
        listOfValues: ["Yes", "No"],
      },
    ],
  };

  return (
    <Container sx={{ width: "100vw", padding: 0 }}>
      <DynamicForm data={dynamicData.data} />
    </Container>
  );
}
