import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import './AddTodo.css'
import { useNavigate } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux';
import {  addTodoThunk, updateTodoThunk } from '../Slice/todoSlice'
import { clearSelectedTodo } from '../Slice/todoSlice';


function AddTodo() {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const selectedTodo = useSelector((state) => state.selectedTodo);
    console.log(selectedTodo," selectedTodo");
    const formik = useFormik({
        initialValues: {
            
            title: selectedTodo?.title || '',
            text: selectedTodo?.text || ''
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Title Required').min(3,'title must be of at least 3 chars'),
            text: Yup.string().required('Text Required').min(10,'text must be at least of 10 chars')
        }),
        onSubmit: (values,{resetForm}) => {

            
            if (selectedTodo) {
                dispatch(updateTodoThunk({ _id: selectedTodo._id, ... values }));
                console.log("Updating Todo:",values);
                resetForm();
                dispatch(clearSelectedTodo());
                navigate('/');
            } else {
                dispatch(addTodoThunk(values));
                resetForm();
                 dispatch(clearSelectedTodo());
            navigate('/');
            }
            // console.log("Form Submitted:", values);
           dispatch(clearSelectedTodo());
        }

    });

  return (
    <div>
        <div className='heading'> {selectedTodo ? "Edit Todo" : "Add Todo"}</div>
        <div className='full-form'>
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" onChange={formik.handleChange} value={ formik.values.title} onBlur={formik.handleBlur} />
            {formik.touched.title && formik.errors.title ? (<p style={{color:'red'}}>{formik.errors.title} </p>) :null }
            <label htmlFor="text">Text:</label>
            <textarea id="text" name="text" onChange={formik.handleChange} value={ formik.values.text} onBlur={formik.handleBlur} ></textarea>
            {formik.touched.text && formik.errors.text ? (<p style={{color:'red'}}>{formik.errors.text}</p>) : null}
            <button className='btn' type="submit">{selectedTodo ? "Update Todo" : "Add Todo"}</button>
        </form>
        </div>
    </div>
  )
}

export default AddTodo