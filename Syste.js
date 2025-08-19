const textarea = document.getElementById('text');

    async function loadEntry() {
        try {
            const response = await fetch('/api/diary');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            textarea.value = data.text || ''; 
        } catch (error) {
            console.error('Error loading diary:', error);
        }
    }

    async function saveEntry() {
        const text = textarea.value;
        try {
            const response = await fetch('/api/diary', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text: text })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            console.log(result.message); 
            alert('บันทึกไดอารี่เรียบร้อยแล้ว!'); 
        } catch (error) {
            console.error('Error saving diary:', error);
            alert('เกิดข้อผิดพลาดในการบันทึกไดอารี่!'); 
        }
    }

    document.addEventListener('DOMContentLoaded', loadEntry);