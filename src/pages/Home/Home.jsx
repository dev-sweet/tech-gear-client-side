import Button from "@mui/material/Button";

const Home = () => {
  return (
    <div>
      <h1 className="text-3xl texl-bold">
        <button className="btn">Button</button>
        <Button variant="contained">Hello world</Button>;
        <button className="btn btn-neutral">Neutral</button>
        <button className="btn btn-primary">Primary</button>
        <button className="btn btn-secondary">Secondary</button>
        <button className="btn btn-accent">Accent</button>
        <button className="btn btn-ghost">Ghost</button>
        <button className="btn btn-link">Link</button>
      </h1>
    </div>
  );
};

export default Home;
