import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpExchange;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;

public class QuizServer {

    public static void main(String[] args) throws IOException {

        HttpServer server = HttpServer.create(
                new InetSocketAddress(8080), 0
        );

        server.createContext("/api/hello", QuizServer::hello);

        server.start();

        System.out.println("Quiz Java Server Started!");
        System.out.println("http://localhost:8080/api/hello");
    }

    private static void hello(HttpExchange exchange) throws IOException {

        String response = "AI Quiz Generator - Java Backend is Working!";

        exchange.getResponseHeaders()
                .set("Content-Type", "text/plain");

        exchange.sendResponseHeaders(
                200, response.length()
        );

        OutputStream output = exchange.getResponseBody();
        output.write(response.getBytes());
        output.close();
    }

    private static void quiz(HttpExchange exchange) throws IOException {

    String response = """
        [
          {
            "question": "Which keyword is used to create a class in Java?",
            "options": ["class", "new", "extends", "static"],
            "answer": "class"
          },
          {
            "question": "Which method is the starting point of a Java program?",
            "options": ["start()", "main()", "run()", "begin()"],
            "answer": "main()"
          }
        ]
        """;

    exchange.getResponseHeaders()
            .set("Access-Control-Allow-Origin", "*");

    exchange.getResponseHeaders()
            .set("Content-Type", "application/json");

    exchange.sendResponseHeaders(200, response.getBytes().length);

    OutputStream output = exchange.getResponseBody();
    output.write(response.getBytes());
    output.close();
    
    }
}