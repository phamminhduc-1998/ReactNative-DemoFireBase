import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, FlatList, TextInput, Image } from 'react-native';
import * as firebase from 'firebase';

//Firebase là 1 dịch vụ của Google dành cho các lập trình viên, nhà phát triển ứng dụng di động, game hay web.
//tích hợp Firebase vào project React native và sử dụng Real time Database để thêm sửa xóa
//Cài đặt thư viện Firebase SDK   npm install --save firebase

export default function App() {
  const [id, setId] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [arr, setArr] = useState([]);



  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDhztHjOqqPgTN2Pzx-9vsx-9fzQy7xPtw",
    authDomain: "fir-democode-13af4.firebaseapp.com",
    databaseURL: "https://fir-democode-13af4.firebaseio.com",
    projectId: "fir-democode-13af4",
    storageBucket: "fir-democode-13af4.appspot.com",
    messagingSenderId: "797507222176",
    appId: "1:797507222176:web:1ea9498de2c3c9b0c4a7c5",
    measurementId: "G-71Z5ZL2FV3"
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }



  //Them du lieu vao Realtime Database
  function storeNewStudent(id, name, email) {
    firebase.database().ref('students/' + id).set({
      Name: name,
      Email: email
    }, function (error) {
      if (error) {
        // The write failed...
        alert('Loi')
      } else {
        // Data saved successfully!
        alert('Thanh cong!!!')
      }
    });
  }




  //Sửa, cập nhật dữ liệu
  //nếu documentId đã tồn tại thì chương trình sẽ tự động ghi đè dữ liệu
  function storeNewStudent(id, name, email) {
    firebase.database().ref('students/' + id).set({
      Name: name,
      Email: email
    }, function (error) {
      if (error) {
        // The write failed...
        alert('Loi')
      } else {
        // Data saved successfully!
        alert('Thanh cong!!!')
      }
    });
  }


  //Xóa dữ liệu
  function deleteData(id) {
    firebase.database().ref('students/' + id).remove();

  }

  //Hiển thị danh sách dữ liệu
  //Array Students sẽ được trả về trong biến snapshot. Mn sử dụng biến này truyền dữ liệu vào FlatList để hiển thị thông tin lên màn hình
  const readUserData = () => {
    firebase.database().ref('students/').on('value', function (snapshot) {

      // console.log(arr)
      let array = [];
      snapshot.forEach(function (childSnapshot) {
        var childData = childSnapshot.val();
        array.push({
          id: childSnapshot.id,
          name: childData.Name,
          email: childData.Email,

        });
      });
      setArr(array)
      console.log(arr);
    });
  }


  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://www.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png" }}
        style={
          {
            width: 100,
            height: 100,
            marginTop: 10
          }
        }></Image>
      <TextInput
        style={styles.textInput}
        placeholder="ID"
        onChangeText={
          (text) => {
            setId(text)
          }
        }></TextInput>
      <TextInput
        style={styles.textInput}
        placeholder="Name"
        onChangeText={
          (text) => {
            setName(text)
          }
        }></TextInput>
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        textContentType="emailAddress"
        onChangeText={
          (text) => {
            setEmail(text)
          }
        }></TextInput>
      <View style={{ flexDirection: 'row' }}>
        <Button title='Them' onPress={() => {
          storeNewStudent(id, name, email);
        }}
        />
        <Button title='Sua' onPress={() => {
          storeNewStudent(id, name, email);
        }}
        />
        <Button title='Xoa' onPress={() => {
          deleteData(id);
        }}
        />
        <Button title='Hien thi' onPress={() => {
          readUserData();
        }}
        />
      </View>
      <FlatList style={{ flex: 1, }}
        data={arr}
        renderItem={({ item }) => (
          <View key={`item_${item.id}`} style={{ borderWidth: 1, margin: 8, width: 250, borderRadius: 5, }}>
            <Text>{item.name}</Text>
            <Text>{item.email}</Text>
          </View>
        )}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {

    width: `80%`,
    borderWidth: 1,
    borderColor: "cyan",
    borderRadius: 5,
    padding: 10,
    margin: 10,
  }
});
