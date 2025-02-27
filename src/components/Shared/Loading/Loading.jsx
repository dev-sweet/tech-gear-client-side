import loadingImg from "../../../assets/spinner.gif";
const Loading = () => {
  return (
    <div className="h-[100vh] flex items-center justify-center">
      <img src={loadingImg} alt="" />
    </div>
  );
};

export default Loading;
