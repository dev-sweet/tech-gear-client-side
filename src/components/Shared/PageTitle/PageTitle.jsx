const PageTitle = ({ pageName }) => {
  return (
    <div className="lg:px-20 px-10 py-5 bg-gray-100 text-gray-700">
      <p>{`Home / ${pageName}`}</p>
      <h3 className="text-center text-3xl font-semibold">{pageName}</h3>
    </div>
  );
};

export default PageTitle;
