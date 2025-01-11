"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  InputLabel,
  Card,
  CardContent,
  Typography,
  Container,
} from "@mui/material";
import { toast } from "react-toastify";

interface IFieldData {
  id: number;
  name: string;
  fieldType: string;
  minLength?: number;
  maxLength?: number;
  defaultValue?: string;
  required: boolean;
  listOfValues?: string[];
}

interface FormProps {
  data: IFieldData[];
}

const DynamicForm: React.FC<FormProps> = ({ data }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit: SubmitHandler<Record<string, string>> = (formData) => {
    // if the form is valid this console log will be printed
    console.log("Form Data:", formData);
    toast.success("submitted successfully");
    reset();
  };

  const renderField = (field: IFieldData) => {
    switch (field.fieldType) {
      case "TEXT":
        return (
          <TextField
            fullWidth
            label={field.name}
            defaultValue={field.defaultValue}
            variant="outlined"
            margin="normal"
            {...register(field.name, {
              required: field.required ? `${field.name} is required` : false,
              minLength: field.minLength,
              maxLength: field.maxLength,
            })}
            error={!!errors[field.name]}
          />
        );

      case "PASSWORD":
        return (
          <TextField
            fullWidth
            label={field.name}
            defaultValue={field.defaultValue}
            variant="outlined"
            margin="normal"
            type="password"
            {...register(field.name, {
              required: field.required ? `${field.name} is required` : false,
              minLength: field.minLength,
              maxLength: field.maxLength,
            })}
            error={!!errors[field.name]}
          />
        );
      case "EMAIL":
        return (
          <TextField
            fullWidth
            label={field.name}
            defaultValue={field.defaultValue}
            variant="outlined"
            margin="normal"
            type="email"
            {...register(field.name, {
              required: field.required ? `${field.name} is required` : false,
              minLength: field.minLength,
              maxLength: field.maxLength,
            })}
            error={!!errors[field.name]}
          />
        );

      case "LIST":
        return (
          <FormControl fullWidth margin="normal">
            <InputLabel error={!!errors[field.name]}>{field.name}</InputLabel>
            <Select
              error={!!errors[field.name]}
              label="gender"
              defaultValue={field.defaultValue}
              {...register(field.name, { required: field.required })}
            >
              {field.listOfValues?.map((value, index) => (
                <MenuItem key={index} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );

      case "RADIO":
        return (
          <FormControl margin="normal">
            <FormLabel error={!!errors[field.name]}>{field.name}</FormLabel>
            <RadioGroup defaultValue={field.defaultValue}>
              {field.listOfValues?.map((value, index) => (
                <FormControlLabel
                  key={index}
                  value={value}
                  control={
                    <Radio
                      {...register(field.name, { required: field.required })}
                    />
                  }
                  label={value}
                />
              ))}
            </RadioGroup>
          </FormControl>
        );

      default:
        return null;
    }
  };

  return (
    <Container
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1e3c72, #2a5298)",
        display: "grid",
        justifyContent: "center",
        width: "100vw",
        alignItems: "center",
      }}
    >
      <Card
        elevation={5}
        variant="outlined"
        sx={{ borderRadius: 5, padding: 3 }}
      >
        <CardContent>
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{
              fontWeight: "bold",
              // padding: "1rem",
            }}
          >
            Signup
          </Typography>
          <Typography
            variant="body2"
            align="center"
            color="textSecondary"
            gutterBottom
          >
            Please enter your credentials to continue.
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* map on the dynamic data form */}
            {data.map((field) => (
              <div key={field.id}>{renderField(field)}</div>
            ))}
            <Button type="submit" variant="contained" fullWidth>
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default DynamicForm;
