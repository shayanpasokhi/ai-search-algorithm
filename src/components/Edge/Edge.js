import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { ErrorMessage } from "@hookform/error-message";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";

const Edge = ({ alg, setGraph, graph, vertexRules, costRules }) => {
  const { g = false } = alg;
  const defaultValues = {
    edge: [
      { parent: graph.vertex[0].vertex, child: graph.vertex[1].vertex, g: 0 },
    ],
  };
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    mode: "all",
    defaultValues,
  });
  const { fields, append, remove } = useFieldArray({
    name: "edge",
    control,
  });

  const watchEdge = useWatch({ name: "edge", control });

  const validChildren = (parent) =>
    graph.vertex.filter(({ vertex }) => vertex !== parent);

  useEffect(() => {
    reset(defaultValues);
  }, [graph.vertex]);

  useEffect(() => {
    for (const index in watchEdge) {
      let parent = watchEdge[index].parent;
      let child = watchEdge[index].child;

      if (parent === child) {
        setValue(`edge.${index}.child`, validChildren(parent)[0].vertex);
      }
    }
  });

  const onSubmit = (data) => {
    const edge = [];

    for (const e of data.edge) {
      edge.push({ parent: e.parent, child: e.child, g: g ? e.g : 0 });
    }

    setGraph((pre) => ({ ...pre, edge, res: { open: [], closed: [] } }));
  };

  return (
    <>
      <h5>یال ها</h5>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        {fields.map((field, index) => {
          let parent = "";

          return (
            <div className="row my-3" key={field.id}>
              <div className={`col-${g ? 3 : 4}`}>
                <Controller
                  render={({ field }) => {
                    parent = field.value;

                    return (
                      <select
                        aria-describedby={`edge.${index}.parent`}
                        className={`form-select${
                          errors?.edge?.[index]?.parent ? " is-invalid" : ""
                        }`}
                        {...field}
                      >
                        {graph.vertex.map(({ vertex }) => (
                          <option key={vertex} value={vertex}>
                            {vertex}
                          </option>
                        ))}
                      </select>
                    );
                  }}
                  name={`edge.${index}.parent`}
                  control={control}
                  rules={vertexRules}
                />
                <ErrorMessage
                  errors={errors}
                  name={`edge.${index}.parent`}
                  render={({ message }) => (
                    <small
                      className="invalid-feedback"
                      id={`edge.${index}.parent`}
                    >
                      - {message}
                    </small>
                  )}
                />
              </div>
              <div className={`col-${g ? 3 : 4}`}>
                <Controller
                  render={({ field }) => {
                    return (
                      <select
                        aria-describedby={`edge.${index}.child`}
                        className={`form-select${
                          errors?.edge?.[index]?.child ? " is-invalid" : ""
                        }`}
                        {...field}
                      >
                        {validChildren(parent).map(({ vertex }) => (
                          <option key={vertex} value={vertex}>
                            {vertex}
                          </option>
                        ))}
                      </select>
                    );
                  }}
                  name={`edge.${index}.child`}
                  control={control}
                  rules={vertexRules}
                />
                <ErrorMessage
                  errors={errors}
                  name={`edge.${index}.child`}
                  render={({ message }) => (
                    <small
                      className="invalid-feedback"
                      id={`edge.${index}.child`}
                    >
                      - {message}
                    </small>
                  )}
                />
              </div>
              {g && (
                <div className="col-3">
                  <input
                    type="number"
                    aria-describedby={`edge.${index}.g`}
                    placeholder="g(n)"
                    className={`form-control${
                      errors?.edge?.[index]?.g ? " is-invalid" : ""
                    }`}
                    {...register(`edge.${index}.g`, costRules)}
                  />
                  <ErrorMessage
                    errors={errors}
                    name={`edge.${index}.g`}
                    render={({ message }) => (
                      <small
                        className="invalid-feedback"
                        id={`edge.${index}.g`}
                      >
                        - {message}
                      </small>
                    )}
                  />
                </div>
              )}
              <div className={`col-${g ? 3 : 4}`}>
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
                append({
                  ...defaultValues["edge"][0],
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

Edge.propTypes = {
  alg: PropTypes.shape({
    h: PropTypes.bool.isRequired,
  }).isRequired,
  setGraph: PropTypes.func.isRequired,
  graph: PropTypes.shape({
    vertex: PropTypes.array.isRequired,
  }).isRequired,
  vertexRules: PropTypes.object,
  costRules: PropTypes.object,
};

export default Edge;
