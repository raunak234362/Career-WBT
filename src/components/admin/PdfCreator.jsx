/* eslint-disable react/prop-types */
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  doc: {
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.2,
    letterSpacing: 1.1,
    width: '900px',
    marginVertical: '20px',
    marginHorizontal: '12px',
  },
  page: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    fontSize: 10,
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    color: '#2c3e50',
    fontWeight: 'bold',
  },
  subHeader: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
    color: '#34495e',
  },
  section: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    borderColor: '#dcdde1',
    borderWidth: 1,
  },
  questHeader: {
    fontSize: 14,
    marginBottom: 8,
    color: '#2980b9',
    fontWeight: 'bold',
  },
  questionText: {
    fontSize: 12,
    marginBottom: 5,
    color: '#2c3e50',
  },
  answerText: {
    fontSize: 12,
    color: '#27ae60',
    marginBottom: 5,
  },
  studentAnswerText: {
    fontSize: 12,
    color: '#c0392b',
    marginBottom: 5,
  },
  img: {
    width: '100%',
    maxWidth: '250px',
    marginVertical: 10,
  },
  color: {
    color: 'red',
  },
  bold: {
    fontWeight: 'bold',
  },
});

const mark = {
  easy: 1,
  medium: 3,
  hard: 5,
};

// Helper function to chunk questions
const chunkQuestions = (questions, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < questions.length; i += chunkSize) {
    chunks.push(questions.slice(i, i + chunkSize));
  }
  return chunks;
};

function PdfCreator({ question, username, marks }) {
  const questionChunks = chunkQuestions(question, 3); // Limit to 3 questions per page

  return (
    <PDFViewer width="1000px" height="900px">
      <Document style={styles.doc}>
        {questionChunks.map((chunk, pageIndex) => (
          <Page key={pageIndex} size="A4" style={styles.page}>
            {pageIndex === 0 && (
              <>
                <View style={styles.header}>
                  <Text>Student: {username}</Text>
                </View>
                <View style={styles.subHeader}>
                  <Text>Marks: {marks}/60</Text>
                </View>
              </>
            )}
            {chunk.map((item, index) => (
              <View key={item?._id} style={styles.section}>
                <View style={styles.questHeader}>
                  <Text>
                    Question {pageIndex * 3 + index + 1} <Text style={styles.color}>[{mark[item?.questionId?.difficult]} Marks]</Text>
                  </Text>
                </View>
                <Text style={styles.questionText}>{item?.questionId?.question}</Text>
                {item?.questionId?.mcqOptions?.length > 0 && (
                  <View>
                    {item?.questionId?.mcqOptions?.map((option, index) => (
                      <Text key={index} style={styles.questionText}>
                        MCQ Option {index + 1}: {option}
                      </Text>
                    ))}
                  </View>
                )}
                {item?.questionId?.multipleQuestion?.length > 0 && (
                  <View>
                    {item?.questionId?.multipleQuestion?.map((question, index) => (
                      <Text key={index} style={styles.questionText}>
                        Sub Question {index + 1}: {question}
                      </Text>
                    ))}
                  </View>
                )}
                {item?.questionId?.questionImage && (
                  <Image src={`${import.meta.env.VITE_IMG_URL}/${item?.questionId?.questionImage}`} style={styles.img} />
                )}
                <View>
                  {item?.questionId?.answer && (
                    <Text style={styles.answerText}>
                      Correct Answer: {item?.questionId?.answer}
                    </Text>
                  )}
                  {item?.questionId?.multipleAnswer?.length > 0 && (
                    <View>
                      {item?.questionId?.multipleAnswer?.map((answer, index) => (
                        <Text key={index} style={styles.answerText}>
                          Sub Answer {index + 1}: {answer}
                        </Text>
                      ))}
                    </View>
                  )}
                </View>
                <View>
                  <Text style={styles.bold}>Answer By Student:</Text>
                  {item?.answer?.map((answer, index) => (
                    <Text key={index} style={styles.studentAnswerText}>
                      {`${index + 1}: ${answer}`}
                    </Text>
                  ))}
                </View>
              </View>
            ))}
          </Page>
        ))}
      </Document>
    </PDFViewer>
  );
}

export default PdfCreator;
