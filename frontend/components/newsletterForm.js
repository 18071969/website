import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import Button from "./ui/button";
import styles from "./contactForm.module.scss";

function NewsletterForm() {

    const { register, formState: { errors }, handleSubmit,  reset } = useForm();
    // Enum for our statuses
    const contactStatuses = {
        loading: 'loading',
        submitted: 'submitted',
        error: 'error'
    };
    // Status of what's happening or happened in the component
    const [status, setStatus] = useState();

    /*useEffect(() => {
         
      console.log('STATUS:::::::::::::::: ', status);
   
    try {
      setStatus(contactStatuses.loading);
      const response = fetch(url, config)
        .then((res) => {
            //console.log('NEWSLETTER FORM === res ', res);
            if (res.ok) {
              setStatus(contactStatuses.submitted);
              return res.json();
            } 
            throw new Error('Error sending email.');
          })
          .then((res) => {
            setStatus(contactStatuses.submitted);
            reset();
          })
          .catch((err) => {
            console.log('NEWSLETTER FORM Component ==== FETCH CATCH err1 - ', err);
          });

        if (response.status == 200) {
          console.log('Thank you for contacting us, we will be in touch soon.');
          reset();
          setStatus(contactStatuses.submitted);
        }
    } catch (err) {
        console.log('NEWSLETTER FORM Component ==== FETCH CATCH err2 - ', err);
        setStatus(contactStatuses.error);
    }
  }, [status]);*/


    async function onSubmitForm(values, e) {

        e.preventDefault();
        e.target.reset();

        let url = `${process.env.NEXT_PUBLIC_API_URL}/api/newsletter`;
        let config = {
          method: 'post',
          headers: {
            'Authorization': 'no',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values)
        };
        console.log('NEWSLETTER FORM Component ==== CONFIG ', config);

        const responseFetch = async () => {
          setStatus(contactStatuses.loading);
          try {
            const res = await fetch(url, config);
            const data = await res.json();
            console.log('NEWSLETTER FORM Component ASYNC ==== DATA - ', data);
            //if (res.ok) {
              setStatus(contactStatuses.submitted);
              reset();
              return data;
            //} 
            //throw new Error('Error sending email.');
          } catch (err) {
            console.error('NEWSLETTER FORM Component ASYNC ==== ERR - ', err);
            setStatus(contactStatuses.error);
          }
        }
        responseFetch();
        /*
        let add = await responseFetch();
        console.log('NEWSLETTER FORM Component ASYNC ==== add - ', add.json);
        if (responseFetch.status == 200 || responseFetch.status == 202) {
          console.log('NEWSLETTER FORM Component ==== Thank you for contacting us, we will be in touch soon.', responseFetch.status);
          setStatus(contactStatuses.submitted);
          reset();
        } */

      }
    
      return (
        <form onSubmit={handleSubmit(onSubmitForm)} className={styles.form}>
          {/*<div className={styles.formRow}><h2>Sign up to our Newsletter</h2></div>*/}

          <div className={styles.formRow}>
              {/*<label htmlFor="email" className="sr-only">
                Email
              </label>*/}
              <input
                  type="text"
                  {...register("email", 
                      { required: "Email is required" ,
                          minLength: {
                              value: 3,
                              message: 'This is not long enough to be an email',
                          },
                          maxLength: {
                              value: 120,
                              message: 'This is too long',
                          },
                          pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Email is invalid',
                          },
                      }
                  )} 
                className={`blockfocus:ring-2 ${
                  errors.email ? 'ring-2 red-500' : null
                }`}
                placeholder="Email"
              />
              <span className={styles.formValidationError}>
                {errors?.email?.message}
              </span>
            </div>
          

          <div className={styles.formRow}>
            <Button               
              type="submit"
              className="inline-flex justify-center" 
              disabled={status === contactStatuses.loading}>
              {status === contactStatuses.loading ? (
                    <>
                    <i className="fa-solid fa-spinner fa-spin"></i>Sending...
                    </>
                ) : (
                    <>Subscribe</>
                )}
            </Button>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formAlert}>
              {/* If there was an error, notify the user */}
              {status === contactStatuses.error ? (
              <div  className={styles["alert"] + " " + styles["alert-success"]} /*className="alert alert-danger"*/>
                  There was an error sending your email. Please try again.
              </div>
              ) : null}

              {/* If the form was submitted successfully, notify the user */}
              {status === contactStatuses.submitted ? (
              <div className={styles["alert"] + " " + styles["alert-success"]} /*className="alert alert-success contact_msg"*/ role="alert">
                  Your subscribsion sent successfully.
              </div>
              ) : null}
            </div>
          </div>
        </form>
      );
}

export default  NewsletterForm;