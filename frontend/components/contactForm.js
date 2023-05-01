import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Button from "./ui/button";
import styles from "./contactForm.module.scss";

function ContactForm() {

    const { register, formState: { errors }, handleSubmit,  reset } = useForm();
    // Enum for our statuses
    const contactStatuses = {
        loading: 'loading',
        submitted: 'submitted',
        error: 'error'
    };
    // Status of what's happening or happened in the component
    const [status, setStatus] = useState();

    async function onSubmitForm(values, e) {

        e.preventDefault();
        e.target.reset();
        let url = `${process.env.NEXT_PUBLIC_API_URL}/api/mail`;
        console.log('CONTACT FORM Component ================== URL ', url);
        console.log('CONTACT FORM Component ================== values ', values);
        let config = {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values)
        };
        console.log('CONTACT FORM Component ==== CONFIG ', config);

        try {
          setStatus(contactStatuses.loading);
          const response = fetch(url, config)
            .then((res) => {
                if (res.ok) {
                  setStatus(contactStatuses.submitted);
                  return res.json();
                }
                  throw new Error('Whoops! Error sending email.');
              })
              .then((res) => {
                setStatus(contactStatuses.submitted);
                reset();
              })
              .catch((err) => {
                console.log('CONTACT FORM Component ==== FETCH CASE 4 - contactStatuses.error');
              });

          console.log('CONTACT FORM === response ', response);
          if (response.status == 200) {
            console.log('Thank you for contacting us, we will be in touch soon.');
            reset();
            setStatus(contactStatuses.submitted);
          }
        } catch (err) {
            setStatus(contactStatuses.error);
        }
      }
    
      return (
        <form onSubmit={handleSubmit(onSubmitForm)} className={styles.form}>
          <div className={styles.formRow}><h2>Send us a message</h2></div>
          <div className={styles.formRow}>
              {/*<label htmlFor="name" className="sr-only">
                Full name
              </label>*/}
              <input {...register('name', { required: {
                              value: true,
                              message: 'You must enter your name',
                          }, })}
                  type="text"
                  placeholder="Full name"
                  className={`block focus:ring-2 ${
                      errors.name ? 'ring-2 red-500' : null
                }`}
                
              />
              <span className={styles.formValidationError}>
                {errors?.name?.message}
              </span>
          </div>

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
          

            {/*<div className={styles.formRowHalf}>
              <label htmlFor="phone" className="sr-only">
                Phone
              </label>
              <input
                type="text"
                {...register('phone', { required: {
                  value: true,
                  message: 'Enter your phone',
                  }, })}
              className={`block w-full shadow py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md focus:outline-none focus:ring-2 ${
                  errors.phone ? 'ring-2 ring-red-500' : null
                }`}
                placeholder="Phone"
              />
              <span className={styles.formValidationError}>
                {errors?.message?.phone}
              </span>
            </div>*/}
          

          <div className={styles.formRow}>
            {/*<label htmlFor="message" className="sr-only">
              Message
            </label>*/}
            <textarea
              rows="5"
              {...register("message", 
                    {   required: {
                            value: true,
                            message: 'You need to enter your message',
                        },
                        minLength: {
                            value: 5,
                            message: 'Your message must be longer than this!',
                        },
                        maxLength: {
                            value: 1000,
                            message: "Your message can't be more than 1000 characters",
                        },
                    }
                )} 

              className={`block w-full shadow py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md focus:outline-none focus:ring-2 ${
                errors.message ? 'ring-2 ring-red-500' : null
              }`}
              placeholder="Message"></textarea>
            <span className={styles.formValidationError}>
              {errors?.message?.message}
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
                    <>Send Message</>
                )}
            </Button>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formAlert}>
              {/* If there was an error, notify the user */}
              {status === contactStatuses.error ? (
              <div  className={styles["alert"] + " " + styles["alert-success"]} /*className="alert alert-danger"*/>
                  Oops, there was an error sending your email. Please try again.
              </div>
              ) : null}

              {/* If the form was submitted successfully, notify the user */}
              {status === contactStatuses.submitted ? (
              <div className={styles["alert"] + " " + styles["alert-success"]} /*className="alert alert-success contact_msg"*/ role="alert">
                  Your message was sent successfully.
              </div>
              ) : null}
            </div>
          </div>
        </form>
      );
}

export default  ContactForm;

/*import { useForm, ValidationError } from "@formspree/react";

export default function ContactForm() {
  const [state, handleSubmit] = useForm("mpzernej");

  if (state.succeeded) {
    return <p>Thanks for your submission!</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
    <label htmlFor="email">
      Email Address
    </label>
    <input
      id="email"
      type="email" 
      name="email"
    />
    <ValidationError 
      prefix="Email" 
      field="email"
      errors={state.errors}
    />
    <textarea
      id="message"
      name="message"
    />
    <ValidationError 
      prefix="Message" 
      field="message"
      errors={state.errors}
    />
    <button type="submit" disabled={state.submitting}>
      Submit
    </button>
  </form>
  );
}*/
