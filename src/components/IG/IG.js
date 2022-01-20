import React from "react";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import PropTypes from "prop-types";
import { ErrorMessage } from "@hookform/error-message";

const IG = ({ graph, vertexRules }) => {
  const defaultValues = {
    ini: graph.vertex[0].v,
    ig: [{ goal: graph.vertex[graph.vertex.length - 1].v }],
  };

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    name: "ig",
    control,
  });

  const watchIg = useWatch({ name: "ig", control });

  const validAlphabet = (current = null) =>
    graph.vertex.filter(({ v }) => {
      let active = watchIg.map((i) => i.goal);

      if (current) active = active.filter((i) => i !== current);

      return !active.includes(v);
    });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <h5>حالت اولیه / اهداف</h5>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <div className="row my-3">
          <div className="col">
            <select
              aria-describedby="ini"
              className={`form-select${errors?.ini ? " is-invalid" : ""}`}
              {...register("ini", vertexRules)}
            >
              {graph.vertex.map(({ v }) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
            <ErrorMessage
              errors={errors}
              name="ini"
              render={({ message }) => (
                <small className="invalid-feedback" id="ini">
                  - {message}
                </small>
              )}
            />
          </div>
        </div>
        <hr />
        {fields.map((field, index) => {
          return (
            <div className="row my-3" key={field.id}>
              <div className="col-6">
                <Controller
                  render={({ field }) => (
                    <select
                      aria-describedby={`ig.${index}.goal`}
                      className={`form-select${
                        errors?.ig?.[index]?.goal ? " is-invalid" : ""
                      }`}
                      {...field}
                    >
                      {validAlphabet(field.value).map(({ v }) => (
                        <option key={v} value={v}>
                          {v}
                        </option>
                      ))}
                    </select>
                  )}
                  name={`ig.${index}.goal`}
                  control={control}
                  rules={vertexRules}
                />
                <ErrorMessage
                  errors={errors}
                  name={`ig.${index}.goal`}
                  render={({ message }) => (
                    <small className="invalid-feedback" id={`ig.${index}.goal`}>
                      - {message}
                    </small>
                  )}
                />
              </div>
              <div className="col-6">
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
                const c = validAlphabet()[0]?.v;
                if (c)
                  append({
                    ...defaultValues["ig"][0],
                    goal: c,
                  });
              }}
            >
              افزودن
            </button>
          </div>
          <div className="col-6">
            <button className="btn btn-primary w-100">پیمایش</button>
          </div>
        </div>
      </form>
    </>
  );
};

IG.propTypes = {
  graph: PropTypes.object.isRequired,
  vertexRules: PropTypes.object,
};

export default IG;
