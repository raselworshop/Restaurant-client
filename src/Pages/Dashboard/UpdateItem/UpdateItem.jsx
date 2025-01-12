import React, { useState, useEffect } from 'react';
import SectionTitle from '../../../Component/shared/SectionTitle';
import { useLoaderData } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useImageHost from '../../../Component/common/ImageHost/useImageHost';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from "yup";
import { FaUtensils } from 'react-icons/fa';
import Swal from 'sweetalert2';

const UpdateItem = () => {
    const [loading, setLoading] = useState(true);
    const items = useLoaderData();
    const axiosPublic = useAxiosPublic();
    const imageHost = useImageHost();
    const axiosSecure = useAxiosSecure();

    const [initialValues, setInitialValues] = useState({
        name: "",
        category: "",
        price: "",
        recipe: "",
        image: null,
    });

    useEffect(() => {
        if (items) {
            setLoading(false);
            setInitialValues({
                name: items.name || "",
                category: items.category || "",
                price: items.price || "",
                recipe: items.recipe || "",
                image: items.image || null, // Image আপডেট করতে নতুন ফাইল
            });
        }
    }, [items]);

    const validationSchema = Yup.object({
        name: Yup.string().required("Recipe Name is required"),
        category: Yup.string().required("Category is required"),
        price: Yup.number()
            .required("Price is required")
            .min(0, "Price must be greater than or equal to 0"),
        recipe: Yup.string().required("Details are required"),
        // image: Yup.mixed().required("A file is required"),
    });

    return (
        <div>
            <SectionTitle heading={'Update an item'} subheading={'Refresh info'}></SectionTitle>
            {loading ? (
                <p>Loading...</p>
            ) : items ? (
                <Formik
                    initialValues={initialValues}
                    enableReinitialize={true}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                        // console.log("Form Data:", values);
                        const formData = new FormData();
                        formData.append("name", values.name);
                        formData.append("category", values.category);
                        formData.append("price", values.price);
                        formData.append("recipe", values.recipe);
                        formData.append("image", values.image);
                        try {
                            const res = await axiosPublic.post(imageHost, formData, {
                                headers: { 'Content-Type': 'multipart/form-data' },
                            });
                            // console.log('Image uploaded successfully:', res.data);
                            if (res.data.success) {
                                const menuItem = {
                                    name: values.name,
                                    category: values.category,
                                    price: values.price,
                                    recipe: values.recipe,
                                    image: res.data.data.url,
                                };
                                const menuRes = await axiosSecure.patch(`/menu/${items._id}`, menuItem);
                                if (menuRes.data.modifiedCount || menuRes.data.modifiedCount > 0) {
                                    Swal.fire({
                                        title: "Item Updated!",
                                        text: `Your item ${values.name} has been updated.`,
                                        icon: "success",
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
                        setSubmitting(false);
                        resetForm();
                    }}
                >
                    {({ values, setFieldValue, isSubmitting }) => (
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
                            {/* File Field */}
                            <div className="mb-4">
                                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                    Choose File:
                                </label>
                                <input
                                    type="file"
                                    name="image"
                                    onChange={(event) => {
                                        const file = event.target.files[0];
                                        setFieldValue("image", file);
                                    }}
                                    className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                                />
                                <div className="mb-4">
                                    {values.image && typeof values.image === "object" ? (
                                        <img
                                            src={URL.createObjectURL(values.image)}
                                            alt="Preview"
                                            className="w-32 h-32 object-cover rounded-md"
                                        />
                                    ) : typeof values.image === "string" ? (
                                        <img
                                            src={values.image} // যদি এটি একটি স্ট্রিং URL হয়
                                            alt="Preview"
                                            className="w-32 h-32 object-cover rounded-md"
                                        />
                                    ) : (
                                        <p className="text-gray-500">No image selected</p>
                                    )}
                                </div>

                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex items-center justify-center bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-md shadow-md focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                            >
                                {isSubmitting ? "Updating..." : "Update"}
                                <FaUtensils className="ml-2 text-lg" />
                            </button>
                        </Form>
                    )}
                </Formik>
            ) : (
                <p>No data found.</p>
            )}
        </div>
    );
};


export default UpdateItem;
