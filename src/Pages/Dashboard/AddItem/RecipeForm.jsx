import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaUtensils } from "react-icons/fa6";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useImageHost from "../../../Component/common/ImageHost/useImageHost";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const RecipeForm = () => {
  const axiosPublic = useAxiosPublic();
  const imageHost = useImageHost();
  const axiosSecure = useAxiosSecure();

  const validationSchema = Yup.object({
    name: Yup.string().required("Recipe Name is required"),
    category: Yup.string().required("Category is required"),
    price: Yup.number()
      .required("Price is required")
      .min(0, "Price must be greater than or equal to 0"),
    recipe: Yup.string().required("Details are required"),
    image: Yup.mixed().required("A file is required"),
  });

  return (
    <Formik
      initialValues={{
        name: "",
        category: "",
        price: "",
        recipe: "",
        image: null, // ekhane data pacci na
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        // console.log("Form Data:", values); //ekhane data pacci

        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("category", values.category);
        formData.append("price", values.price);
        formData.append("recipe", values.recipe);
        formData.append("image", values.image);

        // console.log(formData) //ekhane data pacci na
        // for (let pair of formData.entries()) {
        //   console.log(`${pair[0]}: ${pair[1]}`);
        //   console.log(formData.get("image").name); 
        // }

        try {
          // Upload image to image host API (e.g., imgbb)
          const res = await axiosPublic.post(imageHost, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          })
          console.log('Image uploaded successfully:', res.data);
          if (res.data.success) {
            // now send data to daatabase 
            const menuItem = {
              name: values.name,
              category: values.category,
              price: values.price,
              recipe: values.recipe,
              image: res.data.data.url,
            };
            const menuRes = await axiosSecure.post('/menu', menuItem)
            // console.log("menuREs", menuRes.data)
            if (menuRes.data.insertedId) {
              // show success msg 
              Swal.fire({
                title: "Item add!",
                text: `Your item ${values.name} has been added.`,
                icon: "success"
              });
            }
          }
        } catch (error) {
          // console.error("Error uploading image:", error);
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: error.message,
            showConfirmButton: false,
            timer: 1500
          });
        }

        setTimeout(() => {
          // alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
          resetForm();
        }, 500);
      }}
    >
      {({ setFieldValue, isSubmitting }) => (
        <Form className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Recipe Name:
            </label>
            <Field
              type="text"
              name="name"
              placeholder="Enter the recipe name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            />
            <ErrorMessage name="name" component="div" className="mt-1 text-sm text-red-500" />
          </div>

          <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category:
              </label>
              <Field
                as="select"
                name="category"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              >
                <option value="" label="Select category" />
                <option value="salad" label="Salad" />
                <option value="pizza" label="Pizza" />
                <option value="soup" label="Soup" />
                <option value="dessert" label="Dessert" />
                <option value="drinks" label="Drinks" />
              </Field>
              <ErrorMessage name="category" component="div" className="mt-1 text-sm text-red-500" />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price:
              </label>
              <Field
                type="number"
                name="price"
                placeholder="Enter price"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              />
              <ErrorMessage name="price" component="div" className="mt-1 text-sm text-red-500" />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="recipe" className="block text-sm font-medium text-gray-700">
              Details:
            </label>
            <Field
              as="textarea"
              name="recipe"
              placeholder="Enter details about the recipe"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            />
            <ErrorMessage name="recipe" component="div" className="mt-1 text-sm text-red-500" />
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Choose File:
            </label>
            <input
              type="file"
              name="image"
              // onChange={(event) => setFieldValue("image", event.target.files[0])}
              onChange={(event) => {
                // console.log(event.target.files[0]); 
                const file = event.target.files[0];
                // console.log(file);
                setFieldValue("image", file);
              }}
              className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
            />
            <ErrorMessage name="image" component="div" className="mt-1 text-sm text-red-500" />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-md shadow-md focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            {isSubmitting ? "Submitting..." : "Add Item"}
            <FaUtensils className="ml-2 text-lg" />
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default RecipeForm;
