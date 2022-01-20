import React, { useState } from "react";
import PropTypes from "prop-types";
import NavItems from "../../constants/NavItems";
import { ErrorMessage } from "@hookform/error-message";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";

const Vertex = ({ alg, setGraph, vertexRules, costRules }) => {
  const [alphabet, setAlphabet] = useState(() => {
    const alpha = Array.from(Array(26)).map((e, i) => i + 65);
    return alpha.map((x) => String.fromCharCode(x));
  });
  const { h = false } = NavItems.find((item) => item.id === alg);
  const defaultValues = {
    vertex: [{ vertex: "A", h: 0 }],
  };
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "all",
  });
  const { fields, append, remove } = useFieldArray({
    name: "vertex",
    control,
  });

  const watchVertex = useWatch({ name: "vertex", control });

  const onSubmit = (data) => {
    const vertex = [];

    for (const v of data.vertex) {
      vertex.push({ v: v.vertex, h: h ? v.h : 0 });
    }

    setGraph({
      vertex,
      edge: [],
      ig: { ini: "", goal: [] },
      res: { open: [], closed: [] },
    });
  };

  const validAlphabet = (current = null) =>
    alphabet.filter((c) => {
      let active = watchVertex.map((i) => i.vertex);

      if (current) active = active.filter((i) => i !== current);

      return !active.includes(c);
    });

  return (
    <>
      <h5>رئوس</h5>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        {fields.map((field, index) => {
          return (
            <div className="row my-3" key={field.id}>
              <div className={`col-${h ? 4 : 6}`}>
                <Controller
                  render={({ field }) => (
                    <select
                      aria-describedby={`vertex.${index}.vertex`}
                      className={`form-select${
                        errors?.vertex?.[index]?.vertex ? " is-invalid" : ""
                      }`}
                      {...field}
                    >
                      {validAlphabet(field.value).map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  )}
                  name={`vertex.${index}.vertex`}
                  control={control}
                  rules={vertexRules}
                />
                <ErrorMessage
                  errors={errors}
                  name={`vertex.${index}.vertex`}
                  render={({ message }) => (
                    <small
                      className="invalid-feedback"
                      id={`vertex.${index}.vertex`}
                    >
                      - {message}
                    </small>
                  )}
                />
              </div>
              {h && (
                <div className="col-4">
                  <input
                    type="number"
                    aria-describedby={`vertex.${index}.h`}
                    placeholder="h(n)"
                    className={`form-control${
                      errors?.vertex?.[index]?.h ? " is-invalid" : ""
                    }`}
                    {...register(`vertex.${index}.h`, costRules)}
                  />
                  <ErrorMessage
                    errors={errors}
                    name={`vertex.${index}.h`}
                    render={({ message }) => (
                      <small
                        className="invalid-feedback"
                        id={`vertex.${index}.h`}
                      >
                        - {message}
                      </small>
                    )}
                  />
                </div>
              )}
              <div className={`col-${h ? 4 : 6}`}>
                <button
                  type="button"
                  className="btn btn-outline-danger w-100"
                  onClick={() => remove(index)}
                >
                  حذف
                </button>
              </div>
            </div>
          );
        })}
        <div className="row mt-3">
          <div className="col-6">
            <button
              type="button"
              className="btn btn-outline-primary w-100"
              onClick={() => {
                const c = validAlphabet()[0];
                if (c)
                  append({
                    ...defaultValues["vertex"][0],
                    vertex: c,
                  });
              }}
            >
              افزودن
            </button>
          </div>
          <div className="col-6">
            <button className="btn btn-primary w-100">ثبت</button>
          </div>
        </div>
      </form>
    </>
  );
};

Vertex.propTypes = {
  alg: PropTypes.oneOf(NavItems.map((item) => item.id)).isRequired,
  setGraph: PropTypes.func.isRequired,
  vertexRules: PropTypes.object,
  costRules: PropTypes.object,
};

export default Vertex;
