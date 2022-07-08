import React from "react";
import { Input, Button } from "antd";
import "antd/dist/antd.css";

const { TextArea } = Input;

const GetTestimonial = () => {
  return (
    <header className="App-header">
        <div className="place-content-center bg-slate-200 p-10 rounded-md">
          <h3>Create Your Testimonial</h3>
          <Input placeholder="FullName" className="p-5 rounded bg-black	" />
          <Input
            type="text"
            placeholder="Email"
            className="p-5 rounded bg-black	"
          />
          <TextArea
            rows={4}
            placeholder="Add your testimonial"
            className="p-5 rounded bg-black"
          />
          <Button
            block
            type="primary"
            shape="round"
            size="middle"
            className="mt-4"
          >
            SEND
          </Button>
        </div>
    </header>
  );
};

export default GetTestimonial;
