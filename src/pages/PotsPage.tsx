import PageHeading from "../components/PageHeading";
import Button from "../components/Button";

const PotsPage = () => {
  return (
    <>
      <PageHeading pageTitle="Pots" button={<Button label="Add New Pot" type="primary"/>} />
    </>
  )
}

export default PotsPage;