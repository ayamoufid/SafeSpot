import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    headerSection: {
        flex: 1, // 50% de l'écran
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9', // Couleur de fond pour différencier
        padding: 20,
    },
    sandboxSection: {
        flex: 1, // 50% de l'écran
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    icon: {
        width: 80,
        height: 80,
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    button: {
        backgroundColor: 'gold',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        width: '80%',
        alignItems: 'center',
    },
    buttonRegister: {
        backgroundColor: '#4f86c6',
    },
    textButton: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    mainContainer: {
        flex: 1,
        backgroundColor: '#f2f2f2', // Couleur d'arrière-plan douce
      },
      formContainer: {
        flex: 1,
        justifyContent: 'center', // Centre le formulaire verticalement
        alignItems: 'center', // Centre horizontalement
        padding: 20,
      },
      input: {
        width: '80%', // Champ qui prend 80% de la largeur de l'écran
        height: 50,
        backgroundColor: 'white',
        borderColor: '#ccc', // Bordure grise
        borderWidth: 1,
        borderRadius: 8, // Coins arrondis
        marginBottom: 20, // Espace entre les champs
        paddingLeft: 10, // Espace intérieur à gauche
      },
      buttonContainer: {
        width: '80%', // Bouton aligné avec les champs
        borderRadius: 8,
        overflow: 'hidden', // S'assure que les coins arrondis du bouton sont visibles
      },
      tabBarStyle: {
        backgroundColor: '#ffffff', // Couleur de fond de la Tab Bar
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        height: 60, // Hauteur de la Tab Bar
      },
      tabBarLabelStyle: {
        fontSize: 12, // Taille de police pour le label
        fontWeight: 'bold',
      },
      tabBarIconStyle: {
        width: 30, // Largeur de l'icône
        height: 30, // Hauteur de l'icône
      },
});

export default styles;
