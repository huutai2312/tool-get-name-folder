const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Sử dụng readline để nhập dữ liệu từ terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Hỏi người dùng nhập đường dẫn của thư mục, tên tệp tin và lựa chọn
rl.question('Nhập đường dẫn của thư mục: ', (directoryPath) => {
    rl.question('Nhập tên tệp tin văn bản (.txt): ', (fileName) => {
        rl.question('Bạn muốn lấy tất cả tên thư mục con không? (yes/no): ', (answer) => {
            const getAllDirectories = (dirPath, arrayOfDirs) => {
                const files = fs.readdirSync(dirPath);

                files.forEach((file) => {
                    const filePath = path.join(dirPath, file);
                    const stat = fs.statSync(filePath);

                    if (stat.isDirectory()) {
                        arrayOfDirs.push(filePath);
                        if (answer.toLowerCase() === 'yes') {
                            getAllDirectories(filePath, arrayOfDirs);
                        }
                    }
                });

                return arrayOfDirs;
            };

            // Hàm để ghi tên các thư mục vào một tệp tin văn bản
            const writeDirectoriesToFile = (dirs, outputPath) => {
                const parentDirectories = dirs.map((dir) => path.basename(dir));
                fs.writeFileSync(outputPath, parentDirectories.join('\n'));
                console.log('Tên của các thư mục đã được ghi vào tệp tin thành công!');
            };

            // Lấy tất cả các thư mục
            const allDirectories = getAllDirectories(directoryPath, []);

            // Ghi tên các thư mục vào tệp tin
            const outputFilePath = `${fileName}.txt`;
            writeDirectoriesToFile(allDirectories, outputFilePath);

            // Đóng readline và kết thúc chương trình
            rl.close();
        });
    });
});
