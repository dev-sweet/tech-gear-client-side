import { LiaPhoneVolumeSolid } from "react-icons/lia";
import PageTitle from "../../components/Shared/PageTitle/PageTitle";
import { MdOutlineEmail } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { useForm } from "react-hook-form";

const Contact = () => {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);
  return (
    <>
      <PageTitle pageName="Contact" />
      <div className="lg:px-20 px-10 bg-gray-50 py-10">
        <div className="lg:flex items-center gap-5">
          <div className="min-w-[50%]">
            <h3 className="text-2xl font-semibold">Contact Information</h3>
            <p>
              Fill the form below or write us .We will help you as soon as
              possible.
            </p>

            <div className="lg:flex md:flex items-center justify-between py-10 gap-5">
              <div className="bg-[#FFEAE5] p-10 text-center min-w-[50%] my-5">
                <div className="flex items-center justify-center">
                  <span className="h-[50px] w-[50px] border border-[#2b4190] flex items-center justify-center text-3xl rounded rounded-full text-[#2b4190]">
                    <LiaPhoneVolumeSolid className="font-bold" />
                  </span>
                </div>
                <p>+(323) 9847 3847 383</p>
                <p>+(434) 5466 5467 443</p>
              </div>
              <div className="bg-[#D3EFFF] p-10 text-center min-w-[50%] my-5">
                <div className="flex items-center justify-center">
                  <span className="h-[50px] w-[50px] border border-[#2b4190] flex items-center justify-center text-3xl rounded rounded-full text-[#2b4190]">
                    <MdOutlineEmail />
                  </span>
                </div>

                <p>sweetali0520@gmail.com</p>
                <p>admin@tech-gear.com</p>
              </div>
            </div>
            <div className="bg-[#E7F2EC] w-full">
              <div className="flex gap-5 p-10">
                <div className="flex items-center justify-center">
                  <span className="h-[50px] w-[50px] border border-[#2b4190] flex items-center justify-center text-3xl rounded rounded-full text-[#2b4190]">
                    <SlLocationPin />
                  </span>
                </div>
                <div className="p-10">
                  <h3 className="text-2xl font-semibold">Address</h3>
                  <p>
                    4517 Washington Ave. Manchester, Road 2342, <br />
                    Kentucky 39495
                  </p>
                </div>
              </div>
              <div className="p-5">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387196.0766974763!2d-74.30915211195304!3d40.696672688891866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1740240148833!5m2!1sen!2sbd"
                  width="100%"
                  height="250"
                  // style="border:0;"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
          <div className="min-w-[50%] px-10 bg-white py-10">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2 className="text-3xl font-semibold mb-5 text-center">
                Get In Touch
              </h2>
              <div className="flex flex-col justify-center gap-3">
                <label htmlFor="firstName"> Name *</label>
                <input
                  className="border-1 w-full outline-none py-3 px-5"
                  defaultValue=""
                  placeholder="Your Name"
                  {...register("firstName", { required: true })}
                />
              </div>
              <div className="pt-3 flex flex-col justify-center gap-3">
                <label htmlFor="email"> Email *</label>
                <input
                  className="border-1 w-full outline-none py-3 px-5"
                  defaultValue=""
                  placeholder="Your Email"
                  {...register("email", { required: true })}
                />
              </div>
              <div className="pt-3 flex flex-col justify-center gap-3">
                <label htmlFor="subject"> Subject *</label>
                <input
                  className="border-1 w-full outline-none py-3 px-5"
                  defaultValue=""
                  placeholder="Your Subject here"
                  {...register("email", { required: true })}
                />
              </div>
              <div className="pt-3 flex flex-col justify-center gap-3">
                <label htmlFor="subject"> Message *</label>
                <textarea
                  className="border-1 w-full outline-none py-3 px-5"
                  defaultValue=""
                  placeholder="Your Subject here"
                  {...register("email", { required: true })}
                />
              </div>

              {errors.exampleRequired && <span>This field is required</span>}

              <input
                className="bg-[#2b4190] py-3 w-full text-white mt-5"
                type="submit"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
