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
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      },
      content: {
        alignItems: 'center',
        maxWidth: 300,
        width: '100%',
      },
      iconContainer: {
        backgroundColor: '#2196F3',
        borderRadius: 50,
        padding: 16,
        marginBottom: 16,
      },
      logo: {
        width: 80,
        height: 80,
      },
      title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#2196F3',
        marginBottom: 8,
      },
      subtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 24,
      },
      buttonContainer1: {
        width: '80%',
      },
      loginButton1: {
        backgroundColor: '#2196F3',
        borderRadius: 4,
        padding: 12,
        alignItems: 'center',
        marginBottom: 12,
      },
      loginButtonText1: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
      },
      signupButton1: {
        backgroundColor: '#fff',
        borderColor: '#2196F3',
        borderWidth: 1,
        borderRadius: 4,
        padding: 12,
        alignItems: 'center',
      },
      signupButtonText1: {
        color: '#2196F3',
        fontSize: 16,
        fontWeight: '600',
      },

    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      backButton: {
        padding: 16,
      },
      content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
      },
      iconContainer: {
        backgroundColor: '#2196F3',
        borderRadius: 50,
        padding: 12,
        marginBottom: 16,
      },
      title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#2196F3',
        marginBottom: 24,
      },
      form: {
        width: '100%',
        maxWidth: 300,
      },
      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 12,
        marginBottom: 16,
      },
      forgotPassword: {
        color: '#2196F3',
        textAlign: 'right',
        marginBottom: 16,
      },
      loginButton: {
        backgroundColor: '#2196F3',
        borderRadius: 4,
        padding: 12,
        alignItems: 'center',
      },
      loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
      },
      signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 16,
      },
      signupText: {
        color: '#666',
      },
      signupLink: {
        color: '#2196F3',
        fontWeight: '600',
      },

      container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      backButton: {
        padding: 16,
      },
      content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingBottom: 32,
      },
      iconContainer: {
        backgroundColor: '#2196F3',
        borderRadius: 50,
        padding: 12,
        marginBottom: 16,
      },
      title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#2196F3',
        marginBottom: 24,
      },
      form: {
        width: '100%',
        maxWidth: 300,
      },
      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 12,
        marginBottom: 16,
      },
      signupButton: {
        backgroundColor: '#2196F3',
        borderRadius: 4,
        padding: 12,
        alignItems: 'center',
        marginTop: 8,
      },
      signupButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
      },
      loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 16,
      },
      loginText: {
        color: '#666',
      },
      loginLink: {
        color: '#2196F3',
        fontWeight: '600',
      },
});

export default styles;
