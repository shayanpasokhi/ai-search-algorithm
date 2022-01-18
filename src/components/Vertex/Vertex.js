import React, { useState } from "react";
import PropTypes from "prop-types";
import NavItems from "../../constants/NavItems";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";

const Vertex = ({ alg }) => {
  const [alphabet, setAlphabet] = useState(() => {
    const alpha = Array.from(Array(26)).map((e, i) => i + 65);
    return alpha.map((x) => String.fromCharCode(x));
  });
  const { h = false } = NavItems.find((item) => item.id === alg);
  const defaultValues = {
    vertex: [{ vertex: "A", h: "" }],
  };
  const { handleSubmit, control } = useForm({
    defaultValues,
  });
  const { fields, append, remove } = useFieldArray({
    name: "vertex",
    control,
  });

  const watchVertex = useWatch({ name: "vertex", control });

  const onSubmit = (data) => {
    console.log(data);
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
                    <select className="form-select" {...field}>
                      {validAlphabet(field.value).map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  )}
                  name={`vertex.${index}.vertex`}
                  control={control}
                />
              </div>
              {h && (
                <div className="col-4">
                  <Controller
                    render={({ field }) => (
                      <input
                        type="number"
                        {...field}
                        className="form-control"
                        placeholder="h(n)"
                        min="0"
                      />
                    )}
                    name={`vertex.${index}.h`}
                    control={control}
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
                    vertex: validAlphabet()[0],
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
};

export default Vertex;
