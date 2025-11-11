import { Helmet } from "react-helmet-async";

interface StructuredDataProps {
  data: object | object[];
}

const StructuredData = ({ data }: StructuredDataProps) => {
  const schemaArray = Array.isArray(data) ? data : [data];
  
  return (
    <Helmet>
      {schemaArray.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default StructuredData;
