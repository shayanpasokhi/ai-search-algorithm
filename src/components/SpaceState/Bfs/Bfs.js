import React from "react";
import { useForm } from "react-hook-form";

const Bfs = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
      <div className="row">
        <div className="col-5">
          <input
            {...register("vertex")}
            type="text"
            className="form-control"
            placeholder="راس"
          />
        </div>
        <div className="col-5">
          <input
            {...register("edge")}
            type="text"
            className="form-control"
            placeholder="یال"
          />
        </div>
        <div className="col-2">
          <button type="button" className="btn btn-outline-primary w-100">
            +
          </button>
        </div>
      </div>
    </form>
  );
};

export default Bfs;
