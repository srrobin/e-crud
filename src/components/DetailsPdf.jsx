import React from "react";
import { useParams } from "react-router-dom";
import { Document, Page, Text, View, StyleSheet, PDFViewer, Image } from "@react-pdf/renderer";
import { useQuery } from "@tanstack/react-query";
import { DetailsProducts } from "../utils/Axios";

const styles = StyleSheet.create({
  heading: {
    fontSize: 40,
    marginBottom: 20
  },
  image: {
    height: 100,
    width: 100   
  },
  page: {
    padding: 20
  },
  status: {
    backgroundColor: "#FFF8DC",
    marginBottom: 5,
    display: "block",
    
  }
});

const DetailsPdf = () => {
  const { id } = useParams();
  console.log("🚀 ~ DetailsPdf ~ DetailsPdf:", id);
  const { data } = useQuery({
    queryKey: ["products", id],
    queryFn: () => DetailsProducts(id),
  });
  console.log("🚀 ~ DetailsPdf ~ data:", data);
  const generatePDF = (data) => {
    return (
      <Document title="Person Details">
        <Page size="A4" style={styles.page}>
          <View>
            <Text style={styles.heading}>{data?.category?.creationAt}</Text>
            <Text style={styles.status}> {data?.category?.name}</Text>
            <Image src={data?.images[0].replace(/['"]+/g, "").replace(/^\[|\]$/g, "")} style={styles.image} />
            <Text> {data?.title}</Text>
            <Text> {data?.price}</Text>
            <Text> {data?.description}</Text>

          </View>
        </Page>
      </Document>
    );
  };

  return (
    <div>
      <PDFViewer style={{ width: "100%", height: "500px" }}>
        {generatePDF(data)}
      </PDFViewer>
    </div>
  );
};

export default DetailsPdf;
