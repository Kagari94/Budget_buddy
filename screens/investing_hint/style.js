import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
   
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 22,
 
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  calculator: {
    marginTop: 30,
    padding: 20,   
    borderRadius: 10,
    borderWidth: 1,
     
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    
  },
  inputGroup: {
    marginBottom: 20,
   
  },
  input: {
    borderWidth: 1,
    borderColor: '#5e5ce6', 
   
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  resultGroup: {
    marginTop: 30,
    padding: 20,
    borderWidth: 1,
    borderColor: '#3a3a3c',
    borderRadius: 5,
   
  },
  button: {
    backgroundColor: '#8c4ff7', 
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#ffffff', 
    fontWeight: 'bold',
    fontSize: 16,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderThumb: {
   
  },
  sliderTrack: {
    backgroundColor: '#8c4ff7', 
  },
  error: {
    color: 'red',
    marginTop: 5,
    fontSize: 14,
  },
});
