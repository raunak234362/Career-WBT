/* eslint-disable react/prop-types */
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
import { BASE_URL } from '../../constants';

// Create styles
const styles = StyleSheet.create({
    doc: {
        fontFamily: 'Helvetica',
        fontSize: 11,
        lineHeight: 1.5,
        letterSpacing: 1.1,
        width: '900px'
    },
  page: {
    flexDirection: 'col',
    backgroundColor: '#E4E4E4',
    fontSize: '10px'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  img: {
    width: '250px'
  }
});

function PdfCreator({question, username, marks}) {
  return (
    <PDFViewer width={`1200px`} height={`900px`}>
    <Document style={styles.doc}>
    <Page size="A4" style={styles.page}>

        <View style={styles.section}>
            <View>
                <Text>Student: {username}</Text>
            </View>
            <View>
                <Text>Marks: {marks}/60</Text>
            </View>
        </View>
      {
        question?.map((item, index) => (
          <View key={item?._id} style={styles.section}>
            <View>
                <Text>Question{index+1}</Text>
            </View>
            <View>
            <Text>{item?.questionId?.question}</Text>
            </View>
            {
                (item?.questionId?.mcqOptions?.length > 0) && (
                    item?.questionId?.mcqOptions?.map((option, index) => (
                        <View key={index}>
                        <Text>MCQ Option {index+1}: {option}</Text>
                    </View>
                    ))
                )
            }
            {
                (item?.questionId?.multipleQuestion.length > 0) && (
                    item?.questionId?.multipleQuestion?.map((question, index) => (
                        <View key={index}>
                        <Text>Sub Question {index+1}: {question}</Text>
                    </View>
                ))
            )
            }

            {
                (item?.questionId?.questionImage) && (
                    <View>
                    <Image src={`${BASE_URL}/${item?.questionId?.questionImage}`} style={styles.img}/> 
                    </View>
                )
            }
            <View>
                {   
                    (item?.questionId?.answer) && (
                        <Text>Correct Answer: {item?.questionId?.answer}</Text>
                    )
                }
                {
                    (item?.questionId?.multipleAnswer?.length > 0) && (
                        item?.questionId?.multipleAnswer?.map((answer, index) => (
                            <View key={index}>
                            <Text>Sub Answer {index+1}: {answer}</Text>
                            </View>
                        ))
                    )
                }
            </View>
            <View>
            <Text >Answer By Student</Text>
            </View>

            <Text>{item?.answer?.map((answer, index) => (
                <View key={index}>
                    <Text >{`${index+1}:${answer}\n`}</Text>
                    <Text><br/></Text>
                </View>
            ))}</Text>
          </View>
        ))
      }
    </Page>
  </Document>
  </PDFViewer>
  )
}

export default PdfCreator
